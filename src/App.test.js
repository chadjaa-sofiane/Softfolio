import ReactDom from "react-dom"
import ApolloApp from "./apolloProvider"

it("renders without crashing",()=>{
    const div = document.createElement('div')
    ReactDom.render(ApolloApp,div)
})