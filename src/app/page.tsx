"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const URL =
  "https://api.hackertab.dev/engine/feed/get?tags=android,artificial+intelligence,data+science,devops,go,java,javascript,kotlin,machine+learning,powershell,python,swift,typescript&limit=50";

interface Headline {
  id: number;
  title: string;
  url: string;
  published_at: number;
  tags: string[];
  reactions: number;
  comments: number;
  image_url: string;
  source: string;
  description: string;
}

export default function Home() {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get<Headline[]>(URL);
        // Filtra e salva apenas as manchetes com imagem
        const headlinesWithImage = response.data.filter(
          (headline) => headline.image_url
        );
        setHeadlines(headlinesWithImage);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError(
          "Erro ao carregar os dados. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  const sortedHeadlines: Headline[] = [...headlines].sort(
    (a, b) => b.published_at - a.published_at
  );

  const news: Headline[] = sortedHeadlines.slice(0, 4);

  const podium: Headline[] = [...headlines]
    .sort((a, b) => b.reactions - a.reactions)
    .slice(0, 4);

  const featured: Headline = podium[0];

  if (loading) {
    return (
      <div className="h-screen p-4 m-auto max-w-7xl">
        <div className="grid h-full grid-cols-3 gap-4">
          <Skeleton className="grid h-full md:col-span-2 md:row-span-4"></Skeleton>

          <Skeleton className="h-full md:col-span-1 md:row-span-4 bg-slate-800 text-slate-50"></Skeleton>

          <Skeleton className="h-full md:col-span-3 md:row-span-1"></Skeleton>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen p-4 m-auto max-w-7xl">
      <div className="grid w-full gap-4 m-auto md:grid-cols-3">
        <Card className="grid md:col-span-2 md:row-span-4 ">
          <CardHeader>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src={featured.image_url}
                alt=" "
                layout="fill"
                objectFit="cover"
              />
            </AspectRatio>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
                {featured.title}
              </h1>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {featured.description.slice(0, 128)}...
              </p>
              <a className="w-fit" href={featured.url} target="_blank">
                <Button className="capitalize">Read More</Button>
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 md:row-span-4 bg-slate-800 text-slate-50">
          <CardContent className="pt-6">
            <h2 className="pb-2 text-3xl font-semibold tracking-tight text-yellow-500 scroll-m-20 first:mt-0">
              New
            </h2>
            <ul>
              {news.map((newsItem, index) => (
                <li key={index} className="group">
                  <a href={newsItem.url} target="_blank">
                    <div className="py-6">
                      <h4 className="text-xl font-semibold tracking-tight scroll-m-20 group-hover:text-yellow-300">
                        {newsItem.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {newsItem.description.slice(0, 64)}...
                      </p>
                    </div>
                  </a>
                  {index !== news.length - 1 && <Separator />}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 md:row-span-1">
          <CardContent className="pt-6">
            <ul className="grid gap-4 md:grid-cols-3">
              {podium.slice(1).map((podiumItem, index) => (
                <li
                  key={index}
                  className="h-full duration-150 ease-in-out group hover:scale-95"
                >
                  <a
                    className="grid h-full grid-cols-3 gap-4"
                    href={podiumItem.url}
                    target="_blank"
                  >
                    <AspectRatio ratio={16 / 0} className="bg-muted">
                      <Image
                        src={podiumItem.image_url}
                        alt=" "
                        layout="fill"
                        objectFit="cover"
                      />
                    </AspectRatio>
                    <div className="h-full col-span-2">
                      <h3 className="pb-2 text-2xl font-semibold tracking-tight scroll-m-20 text-muted-foreground group-hover:text-yellow-500">
                        0{index + 1}
                      </h3>

                      <h4 className="text-xl font-semibold tracking-tight scroll-m-20">
                        {podiumItem.title.slice(0, 32)}...
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {podiumItem.description.slice(0, 64)}...
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
