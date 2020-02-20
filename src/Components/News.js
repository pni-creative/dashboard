import React from 'react'
import { Carousel } from 'react-responsive-carousel';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        let posts = "../posts.json";

        fetch(posts).then(response => {
            return response.json();
        }).then(data => {
            this.setState({posts: data.data})
            console.log(data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="box c">
                <div className="title gray-text">
                    <p>News Feed</p>
                </div>
                <div className="carousel-container">
                    {this.state.posts.length > 0 ? (
                        <Carousel 
                            autoPlay 
                            interval={7000} 
                            transitionTime={500} 
                            infiniteLoop
                            showThumbs={false}
                            showStatus={false}
                            showArrows={false}>
                        {
                            this.state.posts.map((post) => {
                                return (
                                    <div className="carousel-content" key={post}>
                                        <h1>{post.title}</h1>
                                        {post.content}
                                    </div>
                                )
                            })
                        }
                        </Carousel>
                    ) : null}
                </div>
            </div>
        )
    }
}

export default News