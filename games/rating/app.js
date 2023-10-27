import { HTML } from "./html.js";

window.closestValue = function(values, targetValue)
{
    let closestValue = values[0];
    let value = closestValue;
    let closestError = Math.abs(closestValue - targetValue);
    for (let i=0; i<values.length; ++i)
    {
        value = values[i];
        if (value === targetValue)
        {
            closestValue = value;
            break;
        }
        else if (Math.abs(value - targetValue) < closestError)
        {
            closestValue = value;
            closestError = Math.abs(value - targetValue);
        }
    }
    return closestValue;
};

const widgets =
{
    'numeric':
    {
        category: 'Basic',
        displayName: 'Numeric',
        min: 0,
        max: 10,
        preview: (current, min, max, t) => min === 0 ? `${current}/${max}` : `${current} on a ${min}–${max} scale`
    },
    'stars':
    {
        category: 'Basic',
        displayName: 'Stars',
        min: 1,
        max: 5,
        round: true,
        preview: (current, min, max, t) => {
            let string = '';
            for (let i=0; i<current; ++i)
            {
                string += '★';
            }
            for (let i=current; i<max; ++i)
            {
                string += '☆';
            }
            return string;
        }
    },
    'letters':
    {
        category: 'Linguistic',
        displayName: 'Alphabet (Latin)',
        min: 0,
        max: 25,
        valueSelect: true,
        data: 'latin.js',
        options: "latin",
        transformFunction: "latin",
        preview: (current, min, max, t) => min === 0 ? `${t(current)}/${t(max)}` : `${t(current)} on a ${t(min)}–${t(max)} scale`
    },
    'planetDistance':
    {
        category: 'Astronomical',
        displayName: 'Planet by distance from the Sun',
        min: 0.387,
        disableChangingMin: true,
        max: 39.5,
        valueSelect: true,
        data: 'planets.js',
        options: "planetDistance",
        transformFunction: "planetDistance",
        preview: (current, min, max, t) => `${t(current)}/${t(max)}`
    },
    'planetOrdinal':
    {
        category: 'Astronomical',
        displayName: 'Planet by distance from the Sun (ordinal)',
        min: 0,
        disableChangingMin: true,
        max: 8,
        valueSelect: true,
        data: 'planets.js',
        options: "planetOrdinal",
        transformFunction: "planetOrdinal",
        preview: (current, min, max, t) => `${t(current)}/${t(max)}`
    },
    'planetMass':
    {
        category: 'Astronomical',
        displayName: 'Planet by mass',
        min: 0.0130,
        max: 1898,
        valueSelect: true,
        data: 'planets.js',
        options: "planetMass",
        transformFunction: "planetMass",
        preview: (current, min, max, t) => min === 0.0130 ? `${t(current)}/${t(max)}` : `${t(current)} on a ${t(min)}–${t(max)} scale`
    },
    'element':
    {
        category: 'Chemical',
        displayName: 'Element by atomic number',
        min: 1,
        max: 94,
        valueSelect: true,
        data: 'elements.js',
        options: "elements",
        transformFunction: "elements",
        preview: (current, min, max, t) => {
            const currentElementDiv = `<div class="element"><span class="atomicNumber">${elementData[current-1].value}</span><span class="symbol">${elementData[current-1].symbol}</span><span class="name">${t(current)}</span></div>`;
            const maxElementDiv = `<div class="element"><span class="atomicNumber">${elementData[max-1].value}</span><span class="symbol">${elementData[max-1].symbol}</span><span class="name">${t(max)}</span></div>`;
            if (min === 1)
            {
                return `<div class="row">${currentElementDiv} / ${maxElementDiv}</div>
                    <div class="row">${t(current)}/${t(max)}`;
            }
            else
            {
                return `<div class="row">${currentElementDiv}</div>
                    <div class="row">${t(current)} on a ${t(min)}–${t(max)} scale`;
            }
        }
    }
};

class RatingWidget
{
    constructor(parent, type, callback, id)
    {
        this.parent = parent;
        this.id = id;
        this.callbackEnabled = true;
        this.normalisedValue = 0;
        this.callback = callback;
        this.template = widgets[type];
        this.min = this.template.min;
        this.max = this.template.max;
        this.round = this.template.round;
        this.reverse = false;
    }

    async load()
    {
        if (this.template.data)
        {
            const promise = new Promise((resolve, reject) => {
                const script = HTML.element('script');
                script.onload = resolve;
                script.onerror = reject;
                script.async = true;
                script.src = `data/${this.template.data}`;
            });
            await promise;
            this.options = window.options[this.template.options];
            this.transformFunction = window.transformFunctions[this.template.transformFunction];
        }
        this.build();
    }

    build()
    {
        const div = HTML.element('div', this.parent, 'widget');
        this.element = div;
        const params = HTML.element('div', div, 'controls');
        if (!this.template.disableChangingMin)
        {
            if (this.template.valueSelect)
            {
                this.inputMin = this.buildSelectBox(params, this.options);
            }
            else
            {
                this.inputMin = HTML.element('input', params);
            }
            this.inputMin.value = this.min;
            this.inputMin.addEventListener('change', () => this.setLimits());
        }
        const reverseContainer = HTML.element('span', params);
        const reverse = HTML.element('input', reverseContainer);
        reverse.setAttribute('type', 'checkbox');
        reverse.id = `reverse${this.id}`;
        const reverseLabel = HTML.element('label', reverseContainer);
        reverseLabel.setAttribute('for', `reverse${this.id}`);
        reverseLabel.innerHTML = 'Reverse';
        reverse.addEventListener('change', () => {
            this.reverse = reverse.checked ? true : false;
            this.setCurrent();
        });
        if (!this.template.disableChangingMax)
        {
            if (this.template.valueSelect)
            {
                this.inputMax = this.buildSelectBox(params, this.options);
            }
            else
            {
                this.inputMax = HTML.element('input', params);
            }
            this.inputMax.value = this.max;
            this.inputMax.addEventListener('change', () => this.setLimits());
        }
        const main = HTML.element('div', div, 'main');
        if (this.template.valueSelect)
        {
            this.inputCurrent = this.buildSelectBox(main, this.options);
        }
        else
        {
            this.inputCurrent = HTML.element('input', main);
        }
        this.inputCurrent.value = this.normalisedValueToCurrentValue(this.normalisedValue);
        this.inputCurrent.addEventListener('change', () => this.setCurrent());
        this.preview = HTML.element('div', div, 'preview');
    }

    buildSelectBox(parent, options)
    {
        const box = HTML.element('select', parent);
        for (let i=0; i<options.length; ++i)
        {
            const optionElement = HTML.element('option', box);
            optionElement.value = options[i].value ? options[i].value : i;
            optionElement.innerHTML = options[i].displayName ? options[i].displayName : options[i];
        }
        return box;
    }

    setLimits()
    {
        if (this.inputMin)
        {
            this.min = Number(this.inputMin.value);
        }
        if (this.inputMax)
        {
            this.max = Number(this.inputMax.value);
        }
        this.setCurrent();
    }

    setCurrent()
    {
        this.inputCurrent.value = Math.max(Math.min(this.max, Number(this.inputCurrent.value)), this.min);
        this.normalisedValue = this.currentValueToNormalisedValue(Number(this.inputCurrent.value));
        if (this.callbackEnabled)
        {
            this.callback(this.normalisedValue);
        }
        if (this.template.preview)
        {
            this.preview.innerHTML = this.template.preview(Number(this.inputCurrent.value), this.min, this.max, this.transformFunction);
        }
    }

    update(normalisedValue)
    {
        this.normalisedValue = normalisedValue;
        if (this.template.valueSelect)
        {
            // Find the closest value
            const targetValue = this.normalisedValueToCurrentValue(this.normalisedValue);
            if (this.options[0].value)
            {
                this.inputCurrent.value = window.closestValue(this.options.map(option => option.value), targetValue);
            }
            else
            {
                const range = [];
                for (let i=0; i<this.options.length; ++i) { range.push(i); }
                this.inputCurrent.value = window.closestValue(range, targetValue);
            }
        }
        else
        {
            this.inputCurrent.value = this.normalisedValueToCurrentValue(this.normalisedValue);
            if (this.round)
            {
                this.inputCurrent.value = Math.round(this.inputCurrent.value);
            }
            else
            {
                this.inputCurrent.value = Math.round(this.inputCurrent.value*100)/100
            }
        }
        this.setCurrent();
    }

    currentValueToNormalisedValue(currentValue)
    {
        const value = (currentValue - this.min) / (this.max - this.min);
        return this.reverse ? 1 - value : value;
    }

    normalisedValueToCurrentValue(normalisedValue)
    {
        if (this.reverse)
        {
            normalisedValue = 1 - normalisedValue;
        }
        return this.min + normalisedValue * (this.max - this.min);
    }
}

class RatingConverter
{
    constructor(parent)
    {
        this.parent = parent;
        this.widgets = [];
        window.transformFunctions = {};
        window.options = {};
        this.normalisedValue = 0;
        this.buildAddWidgetSelect();
        this.addInitialWidgets();
    }

    buildAddWidgetSelect()
    {
        const addWidgetContainer = document.getElementById('addWidgetContainer');
        this.addWidgetSelect = HTML.element('select', addWidgetContainer);
        let groups = new Set(Object.keys(widgets).map(key => widgets[key].category));
        groups = Array.from(groups).sort((a, b) => a === 'Basic' ? -1 : b === 'Basic' ? 1 : a.localeCompare(b));
        groups.forEach(group => {
            const groupElement = HTML.element('optgroup', this.addWidgetSelect);
            groupElement.label = group;
            Object.keys(widgets).filter(key => widgets[key].category === group).sort((a, b) => a.localeCompare(b)).forEach(key => {
                const option = HTML.element('option', groupElement);
                option.value = key;
                option.innerHTML = widgets[key].displayName;
            });
        });
        this.addWidgetSelect.addEventListener('change', () => this.addWidget(this.addWidgetSelect.value));
        this.removeWidgetButton = HTML.element('button', addWidgetContainer);
        this.removeWidgetButton.innerHTML = 'Remove';
        this.removeWidgetButton.addEventListener('click', () => {
            const widget = this.widgets.pop();
            widget.element.remove();
        });
    }

    async addInitialWidgets()
    {
        await this.addWidget('numeric');
        await this.addWidget('stars');
    }

    async addWidget(type)
    {
        const widget = new RatingWidget(document.getElementById('widgets'), type, (normalisedValue) => this.updateCallback(normalisedValue), this.widgets.length);
        await widget.load();
        this.widgets.push(widget);
        this.updateCallback(this.normalisedValue);
    }

    updateCallback(normalisedValue)
    {
        this.normalisedValue = normalisedValue;
        this.widgets.forEach(widget => {
            widget.callbackEnabled = false;
            widget.update(normalisedValue);
            widget.callbackEnabled = true;
        });
    }
}

window.onload = function () {
    new RatingConverter(document.getElementById('ratingConverter'));
};