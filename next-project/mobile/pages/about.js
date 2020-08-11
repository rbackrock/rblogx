import MainLayout from '../components/layout/main-layout'
import AboutHeader from '../components/about-header'
import AboutContent from '../components/about-content'

const about = () => {
  return (
    <MainLayout>
      <AboutHeader></AboutHeader>
      <AboutContent></AboutContent>
    </MainLayout>
  )
}

export default about
