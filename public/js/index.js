class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
    }
    
    addList(value) {
        const lists = this.state.lists;
        lists.push({value, static: true});

        this.setState({lists});
        console.log(lists);
    }

    render() {
        return <div>
            <AddList onAdd={this.addList.bind(this)}/>
            <ShowLists />
        </div>
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
    render() {
        return <div>
            ShowList
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('content'));