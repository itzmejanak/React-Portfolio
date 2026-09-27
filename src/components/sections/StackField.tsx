import type { IconType } from "react-icons";
import {
  SiJavascript, SiTypescript, SiOpenjdk, SiPython, SiSharp, SiRust, SiReact, SiNextdotjs, SiTailwindcss, SiHtml5,
  SiFastapi, SiDjango, SiSpringboot, SiExpress, SiExpo, SiAndroid, SiDotnet, SiTauri, SiPostgresql, SiMysql,
  SiMongodb, SiRedis, SiRabbitmq, SiMqtt, SiDocker, SiNginx, SiGit, SiLinear,
} from "react-icons/si";

/** Keyword → brand icon. Only skills present in the backend list get an icon. */
const MAP: [RegExp, IconType][] = [
  [/^javascript/i, SiJavascript], [/^typescript/i, SiTypescript], [/^java$/i, SiOpenjdk], [/^python/i, SiPython],
  [/^c#/i, SiSharp], [/^rust/i, SiRust], [/^react native|expo/i, SiExpo], [/^react/i, SiReact], [/^next/i, SiNextdotjs],
  [/tailwind/i, SiTailwindcss], [/html/i, SiHtml5], [/fastapi/i, SiFastapi], [/django/i, SiDjango],
  [/spring/i, SiSpringboot], [/express/i, SiExpress], [/android/i, SiAndroid], [/\.net/i, SiDotnet], [/tauri/i, SiTauri],
  [/postgres/i, SiPostgresql], [/mysql/i, SiMysql], [/mongo/i, SiMongodb], [/redis/i, SiRedis], [/rabbit/i, SiRabbitmq],
  [/mqtt/i, SiMqtt], [/docker/i, SiDocker], [/nginx/i, SiNginx], [/^git$/i, SiGit], [/linear/i, SiLinear],
];

export function stackIcons(names: string[]) {
  const out: { name: string; Icon: IconType }[] = [];
  for (const name of names) {
    const hit = MAP.find(([re]) => re.test(name.trim()));
    if (hit && !out.some((o) => o.Icon === hit[1])) out.push({ name, Icon: hit[1] });
  }
  return out;
}

export function StackField({ names }: { names: string[] }) {
  const icons = stackIcons(names);
  if (!icons.length) return null;
  return (
    <>
      <ul className="stack-field" aria-label="Technologies I use">
        {icons.map(({ name, Icon }, i) => (
          <li key={name} style={{ ["--i" as string]: i }} title={name}>
            <Icon aria-hidden="true" />
            <span>{name}</span>
          </li>
        ))}
      </ul>
      <div className="stack-marquee" aria-hidden="true">
        <div>
          {[...icons, ...icons].map(({ name, Icon }, i) => (
            <span key={`${name}-${i}`}><Icon /></span>
          ))}
        </div>
      </div>
    </>
  );
}
