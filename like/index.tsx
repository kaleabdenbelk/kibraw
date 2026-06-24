import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ExternalLink } from "lucide-react";
import { DocsHeader } from "@/components/DocsHeader";
import { DocsSidebar } from "@/components/DocsSidebar";
import { DocsToc } from "@/components/DocsToc";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Introduction | WebContainers" },
      {
        name: "description",
        content:
          "WebContainers are a browser-based runtime for executing Node.js applications and operating system commands, entirely inside your browser tab.",
      },
      { property: "og:title", content: "Introduction | WebContainers" },
      {
        property: "og:description",
        content:
          "A browser-based runtime for executing Node.js applications entirely inside your browser tab.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
    >
      {children}
    </a>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="group mt-12 scroll-mt-20 text-2xl font-bold tracking-tight"
    >
      <a href={`#${id}`}>{children}</a>
    </h2>
  );
}

function Index() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DocsHeader onMenuClick={() => setNavOpen((v) => !v)} />

      <div className="mx-auto flex max-w-[100rem]">
        <DocsSidebar open={navOpen} />

        <main className="min-w-0 flex-1 px-5 py-10 sm:px-10 lg:px-16">
          <article className="mx-auto max-w-3xl text-[15px] leading-7 text-foreground/90">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Introduction
            </h1>

            <p className="mt-6">
              <strong className="text-foreground">
                WebContainers are a browser-based runtime for executing Node.js
                applications and operating system commands, entirely inside your
                browser tab.
              </strong>{" "}
              Apps that previously required cloud VMs to execute user code can
              run entirely client-side in WebContainers, with{" "}
              <A href="#vs-cloud-vm">
                a number of benefits over the legacy cloud VM
              </A>
              .
            </p>

            <p className="mt-5">
              <strong className="text-foreground">
                WebContainer API is perfect for interactive coding experiences.
              </strong>{" "}
              Among its most common use cases are AI applications, adding
              in-browser code execution to your existing product, programming
              tutorials, next-generation documentation, browser-based IDEs, and
              employee onboarding platforms. WebContainers have been
              battle-tested by millions of users of StackBlitz, and inside the
              interactive learning environments built by the{" "}
              <A href="https://learn.svelte.dev/tutorial/welcome-to-svelte">
                Svelte
              </A>
              , <A href="https://angular.dev/tutorials/first-app">Angular</A>,
              and <A href="https://learn-dev.nuxt.com/">Nuxt</A> teams among
              others.
            </p>

            <div className="mt-8 rounded-xl border border-tip-border bg-tip p-5">
              <p className="flex items-center gap-2 font-semibold text-tip-foreground">
                <Sparkles className="h-4 w-4" />
                Ready to try it out for yourself?
              </p>
              <p className="mt-2 text-tip-foreground/90">
                Check out this{" "}
                <a
                  href="https://webcontainer.new/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-2"
                >
                  WebContainer API starter
                </a>{" "}
                or see our Quickstart guide to get familiar with what's
                possible!
              </p>
            </div>

            <H2 id="key-features">Key features</H2>
            <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Native Node.js inside the browser
                </strong>{" "}
                running Node.js toolchains (for example, Webpack, Vite, and
                others)
              </li>
              <li>
                <strong className="text-foreground">Flexible</strong>: build
                next-generation coding experiences powered by WebContainers
              </li>
              <li>
                <strong className="text-foreground">Unmatched security</strong>:
                everything is contained in a browser tab
              </li>
              <li>
                <strong className="text-foreground">Fast</strong>: spinning up
                the entire dev environment in milliseconds
              </li>
              <li>
                <strong className="text-foreground">
                  Always free for Open Source
                </strong>
                : you're the future of the web and we love you 💙
              </li>
            </ul>

            <H2 id="vs-cloud-vm">WebContainers versus cloud VM approach</H2>
            <p className="mt-4">
              WebContainers enables you to build applications that previously
              required running VMs in the cloud to execute user code. Instead,
              WebContainers run entirely client-side, providing a number of
              benefits over the legacy cloud VM approach:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Unmatched user experience.
                </strong>{" "}
                No latency. Faster than localhost. Works offline.
              </li>
              <li>
                <strong className="text-foreground">Cost effective.</strong>{" "}
                Compute is done locally. No paying by the minute for cloud VMs.
              </li>
              <li>
                <strong className="text-foreground">Scales to millions.</strong>{" "}
                Leverages modern CDN caching and client-side compute.
              </li>
              <li>
                <strong className="text-foreground">
                  No risk of bad actors.
                </strong>{" "}
                Say goodbye to bitcoin miners, malware, and phishing sites.
              </li>
            </ul>
            <p className="mt-4">
              If you want to skip the Quickstart guide and jump straight into
              exploring the API, you can open the WebContainer starter project in
              StackBlitz:
            </p>
            <a
              href="https://webcontainer.new/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Open in StackBlitz
              <ExternalLink className="h-4 w-4" />
            </a>

            <H2 id="whos-using">Who's using WebContainers?</H2>
            <p className="mt-4">
              Initially announced at Google I/O,{" "}
              <strong className="text-foreground">
                WebContainers are developed by{" "}
                <A href="https://stackblitz.com/">StackBlitz</A> and have been
                battle-tested by millions of developers every month as they
                power the StackBlitz editor
              </strong>
              . Externally, WebContainers also power a number of popular
              interactive learning environments including those built by the
              Svelte, Angular, and Nuxt teams.
            </p>
            <p className="mt-4">
              To see more examples of how WebContainers have been used so far,
              check out the Community Projects page.
            </p>

            <H2 id="get-started">Get started</H2>
            <p className="mt-4">To get started:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-muted-foreground">
              <li>
                check out our{" "}
                <A href="https://webcontainer.new/">WebContainer starter</A>
              </li>
              <li>
                follow our step-by-step tutorial and build your first
                WebContainer app
              </li>
              <li>read the API reference</li>
              <li>get inspired by our Community projects</li>
            </ul>

            <H2 id="community">Community</H2>
            <p className="mt-4">
              Join the conversation, ask questions, and share what you're
              building with WebContainers. We'd love to see what you create.
            </p>

            <div className="mt-16 border-t pt-6 text-sm text-muted-foreground">
              A clone built for demonstration purposes.
            </div>
          </article>
        </main>

        <DocsToc />
      </div>
    </div>
  );
}
