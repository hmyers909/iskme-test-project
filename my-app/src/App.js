import React, { Component } from 'react';
import './App.css';
import MySelector from './MySelector.js';
import MyText from './MyText.js';



class App extends Component {


    componentWillMount() {
        this.setState({
            selections:[{
                url:'standards',
                filterData: {}
            }],
            full_code: null,
            currentData: {}
        });
    }

    clear(array,num) {
        array.splice(num);
    }

    selectNext(e){
    var selected = e.target.value;
    var currentSelection = e.target.id;
    var selections = this.state.selections;
    var full_code = this.state.full_code;
    var currentData = this.state.currentData;

    console.log("CURRENT SELECTOR", currentSelection);
    console.log("SELECTED VALUE", selected);

    if (currentSelection === "standards"){
        console.log("1 before clear selections", selections)
        if (selections.length > 1){
            this.clear(selections, 1);
            console.log("1 after clear selections", selections)
        }
        if(selected) {
            currentData["standard"] = selected;
            delete currentData["grade"];
            delete currentData["learning_domain"];
            delete currentData["full_code"];
            console.log("CURRENT DICTIONARY", currentData)
            selections.push({
                url:"grades",
                filterData: {'standard': currentData['standard']}
            });
        }
        this.setState({
            selections:selections,
            currentData: currentData,
            full_code: undefined
        });
    }
    else if (currentSelection === "grades"){
        delete currentData["learning_domain"];
        delete currentData["full_code"];
        console.log("2 before clear selections", selections)
        if (selections.length > 2){
            this.clear(selections, 2);
            console.log("CURRENT DICTIONARY", currentData)
            console.log("2 after clear selections", selections)
        }
        if(selected) {
            currentData["grade"] = selected;
            console.log("CURRENT DICTIONARY", currentData)
            selections.push({
                url:"learning_domains",
                filterData: {
                    'standard': currentData['standard'],
                    'grade': currentData['grade'],
                }
            });
        }
        this.setState({
            selections:selections,
            currentData: currentData,
            full_code: undefined
        });
    }
    else if (currentSelection === "learning_domains"){
        console.log("3 before clear selections", selections)
        if (selections.length>3) {
            this.clear(selections,3);
            console.log("CURRENT DICTIONARY", currentData)
            console.log("3 after clear selections", selections)
        }
        if (selected){
            currentData["learning_domain"] = selected;
            delete currentData["full_code"];
            console.log("CURRENT DICTIONARY", currentData)
            selections.push({
                url:"full_codes",
                filterData: {
                    'standard': currentData['standard'],
                    'grade': currentData['grade'],
                    'learning_domain': currentData['learning_domain']
                }
            });
        }
        this.setState({
            selections:selections,
            currentData: currentData,
            full_code: undefined
        });

    }
    else if (currentSelection === "full_codes"){
        if (selections.length>4){
            this.clear(selections, 4);
        }
        if (selected){
            full_code = selected;
            console.log("CURRENT DICTIONARY", currentData)
        }
        this.setState({
            selections:selections,
            currentData: currentData,
            full_code: full_code
        });
    }
  }

  render() {

    var description = null;
    if(this.state.full_code) {
        description = <MyText
        theDescription = {this.state.full_code}/>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Add New Alignment Tag</h1>
        </header>
        { description }
        {this.state.selections.map((selection)=>{
            return <MySelector className="Selectors"
                onSelect = {this.selectNext.bind(this)}
                url = {selection.url}
                dataSelected = {selection.dataSelected}
                dictionary = {selection.filterData}
            />
        })}
      </div>
    );
  }
}




export default App;

