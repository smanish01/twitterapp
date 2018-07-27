import React from 'react';
import './App.css';
import axios from 'axios';


class Twitter extends React.Component {

    componentWillMount(){
        axios.get('http://localhost:3001/userdata')
    }

    //test
    // submitTweet() {
    //     var tweet = document.getElementById('myTextArea').value;
    //     let data = {
    //         tweet : tweet
    //     }

    //     console.log(data)
    //     axios.post('http://localhost:3001/tweet',data)
    //         .then(
    //             res => {
    //                 console.log(res)

    //                 alert('your tweet was submitted successfully')
    //             }
    //         )
    //         .catch(
    //             err => {
    //                 console.log(err)
    //                 alert('your tweet was not submitted successfully')
    //             }
    //         )

    // }


    // componentWillMount(){
    //     axios.get('http://localhost:3001/userdata')
    //     .then(
    //         res => {
    //             console.log(res.data.message)
    //         }
    //     )
    //     .catch(
    //         err => {
    //             console.log(err)
    //         }
    //     )
    // }

    render() {
        return (
            <div id='middlePageDesign'>
                <form onSubmit={this.submitTweet}>
                    <textarea id='myTextArea' maxLength={140}>
                    </textarea>
                    <br />
                    <input type='submit' value='tweet' />
                </form>
            </div>


            // <div id='middlePageDesign'>
            //         <textarea id='myTextArea' maxLength={140}>
            //         </textarea>
            //         <br />
            //         <button  onClick={this.submitTweet}>tweet</button>
            // </div>
        );
    }
}

export default Twitter;
