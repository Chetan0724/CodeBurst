import Image from "next/image";
import { LuGithub } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-12 bg-primarytwo border-t py-14 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col gap-3">
          <Image
            src="/logo_light.svg"
            alt="CodeBurst_logo"
            width={150}
            height={150}
          />
          <p className="text-gray-400 text-lg">
            Master programming through interactive challenges and real-world
            projects. Build your skills one line of code at a time.
          </p>
          <div>
            <ul className="flex flex-row gap-3 items-center">
              <li>
                <a
                  href="https://github.com/Chetan0724"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LuGithub
                    size={22}
                    className="text-gray-400 hover:text-white transition-colors"
                  />
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/Chetany0724"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter
                    size={22}
                    className="text-gray-400 hover:text-white transition-colors"
                  />
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/chetan0724/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiLinkedin
                    size={22}
                    className="text-gray-400 hover:text-white transition-colors"
                  />
                </a>
              </li>
              <li>
                <a
                  href="mailto:ydvchetan01@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdOutlineMailOutline
                    size={26}
                    className="text-gray-400 hover:text-white transition-colors"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold">Quick Links</h4>
          <ul className="text-gray-400 text-lg">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/demo">Try Demo</Link>
            </li>
            <li>
              <Link href="/what-we-do">What We Do</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold">Features</h4>
          <ul className="text-gray-400 text-lg">
            <li>Interactive Coding</li>
            <li>Real-time Feedback</li>
            <li>Progress Tracking</li>
            <li>Multiple Languages</li>
            <li>Gamified Learning</li>
            <li>Community Support</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold">Support</h4>
          <ul className="text-gray-400 text-lg">
            <li>
              <Link href="/">Help Center</Link>
            </li>
            <li>
              <Link href="/">Contact Support</Link>
            </li>
            <li>
              <Link href="/">Documentation</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="mt-14" />
      <div className="text-center">
        <p className="my-6 text-gray-400">
          © 2025 CodeBurst. All rights reserved.
        </p>
        <p className="text-gray-400">Made with ❤️ for developers</p>
      </div>
    </footer>
  );
};

export default Footer;
