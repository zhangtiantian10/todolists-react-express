class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
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

    render() {
        return <div>
            <AddList onAdd={this.addList.bind(this)}/>
            <ShowLists lists={this.state.lists} onDelete={this.deleteList.bind(this)} onChangeStatic={this.modifyStatic.bind(this)}/>
            <Footer count={this.state.lists.filter(list => list.static === true).length}/>
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
            <input type="text" id="input" onKeyDown={this.enterChange.bind(this)}/>
        </div>
    }
}

class ShowLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: {}}
    }
    deleteList(index) {
        this.props.onDelete(index);

    }
    
    render() {
        const lists = this.props.lists.map((list, index) => {
            return <div key={index}>
                <li>
                    <CheckBox onChangeStatic={this.props.onChangeStatic} index={list.index} static={list.static}/>
                    {list.static ? list.value : <s>{list.value}</s>}
                    <button onClick={this.deleteList.bind(this, list.index)}>删除</button>
                </li>
            </div>;
        })

        return <div>
            <ul>
            {lists}
            </ul>
        </div>
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
    render() {
        return <div>
            {this.props.count} items left
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    }
}


ReactDOM.render(<App/>, document.getElementById('content'));