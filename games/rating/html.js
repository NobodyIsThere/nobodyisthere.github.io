class HTML
{
    constructor()
    {
        this.dialogs = {};
    }

    static select(query) { return document.querySelector(query); }
    static selectAll(query) { return document.querySelectorAll(query); }

    static element(tagname, parent=document.body, className = null)
    {
        const el = document.createElement(tagname);
        if (className !== null)
        {
            el.className = className;
        }
        parent.appendChild(el);
        return el;
    }

    static addClass(element, className)
    {
        element.classList.add(className);
    }

    static removeClass(element, className)
    {
        element.classList.remove(className);
    }

    static async loadFragment(url, parent=document.body)
    {
        const response = await fetch(url);
        const text = await response.text();
        parent.innerHTML = text;
    }

    static heading(level, innerHTML, parent=document.body)
    {
        const el = this.element(`h${level}`, parent);
        el.innerHTML = innerHTML;
        return el;
    }

    static input(id, labelHTML="", parent=document.body, labelBefore=true)
    {
        const label = this.element('label', parent);
        label.setAttribute('for', id);
        label.innerHTML = labelHTML;
        const el = this.element('input', parent);
        if (!labelBefore)
        {
            parent.insertBefore(el, label);
        }
        el.id = id;
        return el;
    }

    async modal(id, url)
    {
        if (this.dialogs.hasOwnProperty(id))
        {
            this.dialogs[id].showModal();
            return;
        }
        const dialog = this.element('dialog');
        await this.loadFragment(url, dialog);
        this.dialogs[id] = dialog;
        dialog.showModal();
        return dialog;
    }

    static table(headings, parent=document.body)
    {
        const table = this.element('table', parent);
        const thead = this.element('thead', table);
        const tr = this.element('tr', thead);
        headings.forEach(heading => {
            this.element('th', tr).innerHTML = heading;
        });
        return { table: table, body: this.element('tbody', table) };
    }
}

export { HTML };