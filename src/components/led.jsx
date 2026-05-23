import '../App.css'

function Led() {
  const texto = 'BIENVENIDOS A SEIBUCORP'
  return (
    <div className="banner-led">
      <div className="banner-track">
        <span aria-hidden="true">{texto}</span>
      </div>
    </div>
  )
}

export default Led