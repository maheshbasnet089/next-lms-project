
function Hello(){
    return (
<div className="bg-gradient-to-r from-blue-500 to-green-500 flex flex-col h-screen">
  <nav className="bg-white py-6 px-8 flex justify-between items-center">
    <a href="#" className="text-xl font-bold text-gray-800">Brand Name</a>
    <ul className="flex space-x-6">
      <li><a href="#" className="text-gray-800">Home</a></li>
      <li><a href="#" className="text-gray-800">About</a></li>
      <li><a href="#" className="text-gray-800">Services</a></li>
      <li><a href="#" className="text-gray-800">Contact</a></li>
    </ul>
  </nav>
  <header className="flex-grow flex flex-col justify-center items-center px-8">
    <h1 className="text-5xl font-bold text-white text-center mb-8">Welcome to Brand Name</h1>
    <p className="text-white text-lg text-center mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      sagittis lobortis sapien, eu tincidunt metus semper eget. Sed at malesuada arcu. Pellentesque habitant morbi
      tristique senectus et netus et malesuada fames ac turpis egestas.</p>
    <a href="#" className="text-lg bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg font-bold shadow-md =">Get
      started
    </a>
  </header>
</div>

    )
}


export default Hello