class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            footerFlag: 'All'
        }
    }

    componentDidMount() {
        $.get('/app/todolists', (lists) => {
            this.setState({lists});
        })
    }

    addList(value) {
        $.post('/app/todolist', {value: value}, (lists) => {
            this.setState({lists});
        }, 'json')
    }

    deleteList(index) {
        $.ajax({
            url: '/app/todolist',
            type: 'DELETE',
            dataType: "json",
            data: {index: index},
            success:((lists) => {
                this.setState({lists});
            })
        });
    }

    modifyStatic(index) {
        $.ajax({
            url: '/app/todolist',
            type: 'PUT',
            dataType: "json",
            data: {index: index},
            success:((lists) => {
                this.setState({lists});
            })
        });
    }

    changeFooter(type) {
        this.setState({
            footerFlag: type
        });
    }

    deleteAllCompleted() {
        $.ajax({
            url: '/app/todolists',
            type: 'DELETE',
            dataType: "json",
            success:((lists) => {
                this.setState({lists});
            })
        });
    }

    render() {
        const count = this.state.lists.filter(list => list.static === true).length;
        return <div  className="col-md-6 col-md-offset-3">
            <AddList onAdd={this.addList.bind(this)}/>
            <ShowLists lists={this.state.lists} onDelete={this.deleteList.bind(this)} onChangeStatic={this.modifyStatic.bind(this)} footerFlag={this.state.footerFlag}/>
            {count === 0 ? "" : <Footer count={count} onFooterChange={this.changeFooter.bind(this)} onDelete={this.deleteAllCompleted.bind(this)}/>}
        </div>;
    }
}

class AddList extends React.Component {
    enterChange(e) {
        if(e.keyCode === 13) {
            let value = e.target.value;
            if (!value) return false;

            this.props.onAdd(document.getElementById('input').value);
            document.getElementById('input').value = '';
        }
    }

    render() {
        return <div>
            <h1 className="text-center">todos</h1>
            <input className="form-control input-lg" placeholder="What needs to be done?" type="text" id="input" onKeyDown={this.enterChange.bind(this)}/>
        </div>
    }
}

class ShowLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLists: []
        }
    }

    deleteList(index) {
        this.props.onDelete(index);

    }

    getNewLists() {
        if(this.props.footerFlag === 'All') {
            return this.props.lists;
        } else if(this.props.footerFlag === 'Active') {
            return this.props.lists.filter(list => list.static === true);
        } else {
            return this.props.lists.filter(list => list.static === false);
        }
    }
    
    render() {
        const newLists = this.getNewLists();
        const lists = newLists.map((list, index) => {
            return <div key={index}>
                <li className="list-group-item">
                    <CheckBox onChangeStatic={this.props.onChangeStatic} index={list.index} static={list.static}/>
                    {list.static ? list.value : <s>{list.value}</s>}
                    <button type="button" className="btn btn-link pull-right " onClick={this.deleteList.bind(this, list.index)}>
                        <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
                    </button>
                </li>
            </div>;
        });

        return <ul className="list-group">
            {lists}
            </ul>
    }
}

class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: !this.props.static
        }
    }

    changeStatic() {
        this.setState({
            checked: this.props.static
        });

        this.props.onChangeStatic(this.props.index);
    }


    render() {
        return <input type="checkbox" onChange={this.changeStatic.bind(this)} checked={this.state.checked}/>
    }
}

class Footer extends React.Component {
    footerChange(type) {
        this.props.onFooterChange(type);
    }

    deleteAllCompleted() {
        this.props.onDelete();
    }

    render() {
        return <footer className="list-group-item">
            <span>{this.props.count} items left</span>
            <div className="btn-group" role="group">
            <button type="button" className="btn btn-link" onClick={this.footerChange.bind(this, 'All')}>All</button>
            <button type="button" className="btn btn-link" onClick={this.footerChange.bind(this, 'Active')}>Active</button>
            <button type="button" className="btn btn-link" onClick={this.footerChange.bind(this, 'Completed')}>Completed</button>
                </div>
            <button type="button" className="btn btn-link pull-right" onClick={this.deleteAllCompleted.bind(this)}>Clear completed</button>
            </footer>
    }
}


ReactDOM.render(<App/>, document.getElementById('content'));