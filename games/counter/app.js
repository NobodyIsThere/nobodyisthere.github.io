function createElement(tagName, parent)
{
    const element = document.createElement(tagName);
    parent.appendChild(element);
    return element;
}

class CounterWidget
{
    constructor(parent, data, app, id)
    {
        this.data = data;
        this.app = app;
        this.id = id;

        this.element = createElement('div', parent);
        this.element.className = 'counter';
        
        this.incrementButton = createElement('button', this.element);
        this.incrementButton.innerText = '+';
        this.incrementButton.onclick = () => this.increment();
        
        this.labelElement = createElement('h2', this.element);
        this.labelElement.innerText = this.data.name;
        this.labelElement.setAttribute('contenteditable', true);
        this.labelElement.setAttribute('spellcheck', false);
        this.labelElement.addEventListener('keydown', (e) => this.keyDown(e));
        this.labelElement.addEventListener('input', (e) => this.labelEdited(e));
        this.labelElement.addEventListener('focusout', () => this.onEditableBlur());
        
        this.valueElement = createElement('div', this.element);
        this.valueElement.className = 'value';
        this.valueElement.innerText = this.data.value;
        this.valueElement.setAttribute('contenteditable', true);
        this.valueElement.setAttribute('spellcheck', false);
        this.valueElement.addEventListener('keydown', (e) => this.keyDown(e));
        this.valueElement.addEventListener('input', (e) => this.valueEdited(e));
        this.valueElement.addEventListener('focusout', () => this.onEditableBlur());
        
        this.decrementButton = createElement('button', this.element);
        this.decrementButton.innerText = '−';
        this.decrementButton.onclick = () => this.decrement();
    }

    increment()
    {
        this.valueElement.innerText = ++this.data.value;
        this.app.save();
    }

    decrement()
    {
        this.valueElement.innerText = --this.data.value;
        this.app.save();
    }

    keyDown(event)
    {
        if (event.key === 'Enter')
        {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.target.blur();
        }
    }

    labelEdited(event)
    {
        this.data.name = this.labelElement.innerText.trim();
        this.app.save();
    }

    onEditableBlur()
    {
        if (this.data.name === '' || this.data.value === '')
        {
            this.app.delete(this.id);
            this.element.parentElement.removeChild(this.element);
        }
    }

    valueEdited(event)
    {
        if (!isNaN(Number(this.valueElement.innerText.trim())))
        {
            this.data.value = this.valueElement.innerText.trim();
        }
        if (this.valueElement.innerText.trim() === '')
        {
            this.data.value = '';
        }
        this.app.save();
    }

    static NewCounterData()
    {
        return {name: 'Counter', value: 0};
    }
}

class App
{
    constructor()
    {
        this.data = localStorage.getItem('counters');
        if (!this.data)
        {
            this.data = [CounterWidget.NewCounterData()];
        }
        else
        {
            this.data = JSON.parse(this.data);
        }

        this.createWidgets();
        document.getElementById('addCounter').onclick = () => this.addCounter();
    }

    createWidgets()
    {
        const parent = document.getElementById('counters');
        for (let i=0; i<this.data.length; ++i)
        {
            new CounterWidget(parent, this.data[i], this, i);
        }
    }

    addCounter()
    {
        const newData = CounterWidget.NewCounterData();
        this.data.push(newData);
        new CounterWidget(document.getElementById('counters'), newData, this, this.data.length-1);
    }

    delete(id)
    {
        this.data.splice(id, 1);
        this.save();
    }

    save()
    {
        localStorage.setItem('counters', JSON.stringify(this.data));
    }
}

function onPageLoaded()
{
    new App();
}

window.onload = onPageLoaded;