import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import dropdown_icon from "../assets/frontend_assets/dropdown_icon.png"
import Title from "../components/Title"
import ProductItems from "../components/ProductItems"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[]; // Ensure this is an array of strings for multiple images
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

const Collection = () => {
  const { products } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (category.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  useEffect(() => {
    setFilterProducts(products)
  }, [])

  useEffect(() => {
    console.log(category)
  }, [category])
  useEffect(() => {
    console.log(subCategory)
  }, [subCategory])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t  ">
      {/* Filter Opetion */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">Filter
          <img src={dropdown_icon} className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} alt="" />
        </p>
        {/* Category filter */}
        <div className={`border bordr-gray-300 pl-5 py-5 mt-6 ${showFilter ? "" : "hidden"} sm:block `}>
          <p className="mb-3 text-sm font-medium ">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} />
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} />
              Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory */}
        <div className={`border bordr-gray-300 pl-5 py-5 mt-4 ${showFilter ? "" : "hidden"} sm:block `}>
          <p className="mb-3 text-sm font-medium ">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />
              Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* RightSide */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'All'} text2={'Collection'} />
          <select className="border-2 border-gray-300 tex-sm px-2">
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high"> Sort by:Low to High</option>
            <option value="high-low"> Sort by:High to Low</option>
          </select>
        </div>
        {/* MapProduct */}
        <div className=" grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection