import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

function App() {

  return (
    <>
    <TwitterFollowCard username="zendaya" name="Zendaya" avatar={'https://api.dicebear.com/9.x/adventurer/svg?seed=Miss%20kitty'}/>
    <TwitterFollowCard username="leomessi" name="Leo Messi" avatar={'https://api.dicebear.com/9.x/adventurer/svg?seed=Sophie'}/>
    <TwitterFollowCard username="billieeilish" name="Billie Eilish" avatar={'https://api.dicebear.com/9.x/adventurer/svg?seed=Oliver'}/>
    </>
  )
}

export default App
