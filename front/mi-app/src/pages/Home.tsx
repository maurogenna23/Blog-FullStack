import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import PostPage from "./PostPage"

const Home = () => {
    return (
        <>
            <Header />
            <div>
                <Hero />
                <PostPage />
            </div>
            <Footer />
        </>
    )
}

export default Home