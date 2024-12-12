import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"
import { assets } from "../assets/frontend_assets/assets"

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/3 text-gray-600" >
          <p>We invite you to explore our latest collections and discover clothing that fits your lifestyle.
            Follow us on social media for updates, style inspiration,
            and exclusive offers. Together, let's make fashion fun, inclusive, and unforgettable.</p>
          <p>Our mission is simple: to provide high-quality, stylish clothing that empowers you
            to look and feel your best, all at prices you'll love. We are committed to sustainability,
            inclusivity, and celebrating individuality through fashion.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Our mission is simple: to provide high-quality, stylish clothing that empowers you to look and feel your best, all at prices you'll love.
            We are committed to sustainability, inclusivity, and celebrating individuality through fashion.</p>
        </div>
      </div>
      <div className="text-4xl PY-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p>Each piece is crafted with care, ensuring durability and comfort.</p>

        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Affordable Prices</b>
          <p>We believe great fashion should be accessible to everyone.</p>

        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Service</b>
          <p>From easy shopping to fast delivery, your satisfaction is our priority.</p>

        </div>

      </div>
      <NewsletterBox />
    </div>
  )
}

export default About