import React, { Component } from 'react'

export default class MovieForm extends Component {
    state={
        title:'',
        director:'',
        metascore:0,
        stars:['']
    }

    formChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    addStar=e=>{
        e.preventDefault()
        this.setState((prevState, props) => ({ stars:prevState.stars.concat('') }))
    }

    starChange=e=>{
        let temp=this.state.stars.map(i=>i)
        temp[e.target.name]=e.target.value
        this.setState({
            stars:temp
        })
    }

    handleSubmit=e=>{
        e.preventDefault()
        this.props.submit({...this.state})
        this.setState({
            title:'',
            director:'',
            metascore:0,
            stars:['']
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="title">Title: <input type="text" name="title" value={this.state.title} onChange={this.formChange}/></label>
                <label htmlFor="director">Director: <input type="text" name="director" value={this.state.director} onChange={this.formChange}/></label>
                <label htmlFor="metascore">Metascore: <input type="number" name="metascore" value={this.state.metascore} onChange={this.formChange}/></label>
                <h3>Stars:</h3>
                <fieldset>
                    <section>
                        {this.state.stars.map((item,index)=>(
                            <input type="text" name={index} value={item} onChange={this.starChange}/>
                        ))}
                    </section>
                    <button onClick={this.addStar}>Add Star</button>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        )
    }
}
