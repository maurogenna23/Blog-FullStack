import Create from "../components/CreatePost"
import Posts from "../components/PostList"

const PostPage = () => {
    return (
        <div>
            <Create />
            <div className="mt-20">
                <Posts />
            </div>
        </div>
    )
}

export default PostPage