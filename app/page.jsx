import Feed  from "@components/Feed";

const Home = () => {
  return (
    <section className='w-full flex-col flex-center'>
        <h1 className='head_text text-center'>
        Discover & Share 
        <br  />
        <span className='orange_gradient text-center '>AI powered Prompts</span>
        </h1>

        <p className='text-center desc' >
          PromptStar is an open source Prompt sharing platform where you can create, or discover different useful AI prompts
        </p>

        <Feed />
    </section>
  )
}

export default Home