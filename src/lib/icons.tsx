import type { ComponentType } from "react";
import { IoMdAnalytics } from "react-icons/io";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineSupportAgent, MdOutlineAlternateEmail } from "react-icons/md";
import { RiExchange2Fill, RiJavascriptFill } from "react-icons/ri";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLaptopCode,
  FaCss3Alt,
  FaJava,
  FaVolleyball,
} from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaGlobe, FaFacebookSquare, FaPaintBrush, FaNodeJs, FaGooglePlay, FaQuestionCircle } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { DiReact } from "react-icons/di";
import { SiExpress, SiMongodb } from "react-icons/si";
import { CgFigma } from "react-icons/cg";
import { TbBrandReactNative, TbFileTypeXml } from "react-icons/tb";
import { TiHtml5 } from "react-icons/ti";

const iconComponents: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  GrUserExpert,
  IoMdAnalytics,
  MdOutlineSupportAgent,
  RiExchange2Fill,
  FaPaintBrush,
  FaLaptopCode,
  TfiWrite,
  MdOutlineAlternateEmail,
  IoCallOutline,
  IoLocationOutline,
  FaInstagram,
  FaFacebookSquare,
  FaXTwitter,
  FaYoutube,
  TiHtml5,
  FaCss3Alt,
  RiJavascriptFill,
  FaGooglePlay,
  SiAdobexd: FaPaintBrush,
  FaJava,
  TbFileTypeXml,
  FaVolleyball,
  DiReact,
  FaNodeJs,
  SiExpress,
  SiMongodb,
  CgFigma,
  TbBrandReactNative,
  FaQuestionCircle,
  FaGithub,
  FaLinkedin,
  FaGlobe,
};

export function Icon({
  name,
  size = 22,
  className = "",
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  const clean = (name ?? "").replace(/['"<>/{}\s]/g, "");
  const Component = iconComponents[clean] ?? FaQuestionCircle;
  return <Component size={size} className={className} />;
}
