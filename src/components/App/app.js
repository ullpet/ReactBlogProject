import React, { Component } from "react";
import AppHeader from "../AppHeader";
import PostAddForm from "../PostAddForm";
import PostList from "../PostList";
import PostStatusFilter from "../PostStatusFilter";
import SearchPanel from "../SearchPanel";
import "./app.css";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: "Я изучаю React", important: true, like: false, id: 1},
                {label: "Отличная библиотека!", important: false, like: false, id: 2},
                {label: "Компонентный подход - супер", important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.toggleImportant = this.toggleImportant.bind(this);
        this.likeItem = this.likeItem.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onUpdateSearch =  this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.max = 4;
    };

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.max++
        };

        this.setState(({data}) => {
            const newData = [...data, newItem];
            return {
                data: newData
            };
        });
    };

    deleteItem(id){
        this.setState(({data}) => {
            const newData = data.filter(item => item.id !== id);
            return {
                data: newData
            };
        });
    };

    toggleImportant(id) {
        this.setState(({data}) => {
            const newData = data.map((item) => {
                if (item.id !== id) {
                    return item
                }
                else {
                    return {...item, important: !item.important}
                };
            });
            return {
                data: newData
            }
        });
    };

    likeItem(id) {
        this.setState(({data}) => {
            const newData = data.map((item) => {
                if (item.id !== id) {
                    return item
                }
                else {
                    return {...item, like: !item.like}
                };
            });
            return {
                data: newData
            }
        });
    };

    onSearch(items, term) {
        if (items.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    }

    onUpdateSearch(term) {
        this.setState({term: term});
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items;
        }
    } 

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const likedPosts = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.onSearch(data, term), filter);


        return (
            <div className="app">
                <AppHeader
                    like = {likedPosts}
                    all = {allPosts}
                    />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch = {this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter = {filter}
                        onFilterSelect = {this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts = {visiblePosts}
                    onDelete = {this.deleteItem}
                    onToggleImportant = {this.toggleImportant}
                    onLike = {this.likeItem}
                    />
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}