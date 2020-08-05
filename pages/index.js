import { getAllPosts } from '../lib/api'

const Index = ({ allPosts }) => (
  <>
    <h1>Hello</h1>
    <p>{JSON.stringify(allPosts)}</p>
  </>
)

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
  ])

  const data = {
    java: [
      {
        title: 'java标题1',
        content: 'java内容1'
      },
      {
        title: 'java标题2',
        content: 'java内容2'
      }
    ],
    c: [
      {
        title: 'c标题1',
        content: 'c内容1'
      }
    ]
  }

  return {
    props: { data }
  }
}

export default Index
