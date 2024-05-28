import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsDribbble,
  BsLinkedin,
} from "react-icons/bs";
import Logo from "./Logo";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-[#0E7490]">
      <div className="w-full max-w-[1500px] mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Logo />
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Property Pro
                </Footer.Link>
                <Footer.Link
                  href="https://alfredasante.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Author
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/Fredasante"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/alfred-apenteng/"
                  target="_blank"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="PropertyPro"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon
              icon={BsLinkedin}
              href="https://www.linkedin.com/in/alfred-apenteng/"
              target="_blank"
            />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon
              href="https://github.com/Fredasante"
              target="_blank"
              icon={BsGithub}
            />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
