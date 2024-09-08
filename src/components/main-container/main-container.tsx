import MainContainerHeader from './main-container-header/main-container-header'
import MainContainerTree from './main-container-tree/main-container-tree'

export default function MainContainer() {
  return (
    <main
      style={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        margin: '8px',
        padding: '0px 16px'
      }}
    >
      <MainContainerHeader />
      <section id='main-container'>
        <MainContainerTree />
        {/* <ComponentDetails /> */}
      </section>
    </main>
  )
}
