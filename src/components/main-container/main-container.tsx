import MainContainerHeader from './main-container-header/main-container-header'

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
      <section>
        {/* <TreeRender />
        <ComponentDisplay /> */}
      </section>
    </main>
  )
}
