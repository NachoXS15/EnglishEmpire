import '../styles/MainBanner.css'

export function MainBanner(props) {
  return (
    <div className='main-banner'>
      <p>{props.children}</p>
      <div></div>
    </div>
  )
}