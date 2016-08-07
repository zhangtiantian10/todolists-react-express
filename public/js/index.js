class App extends React.Component {
    render() {
        return <div>
            <AddList />
            <ShowLists />
        </div>
    }
}

class AddList extends React.Component {
    render() {
        return <div>
            AddList
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