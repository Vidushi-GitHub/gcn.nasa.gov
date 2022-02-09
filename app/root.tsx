import {
  Link,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix'

import { useState } from 'react'

import type { LoaderFunction, MetaFunction, NavLinkProps } from 'remix'

import {
  GovBanner,
  GridContainer,
  Header,
  Footer,
  FooterNav,
  Logo,
  NavMenuButton,
  PrimaryNav,
  Title,
  NavDropDownButton,
  Menu,
} from '@trussworks/react-uswds'

import { storage } from '~/lib/auth.server'

import highlightStyle from 'highlight.js/styles/github.css'
import logo from './img/logo.svg'

export const meta: MetaFunction = () => {
  return { title: 'GCN - General Coordinates Network' }
}

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: '/static/css/custom.css',
  },
  {
    rel: 'stylesheet',
    href: highlightStyle,
  },
  ...[16, 40, 57, 72, 114, 144, 192].map((size) => ({
    rel: 'icon',
    href: `/static/img/favicons/favicon-${size}.png`,
    sizes: `${size}x${size}`,
  })),
]

export const loader: LoaderFunction = async function ({ request }) {
  const session = await storage.getSession(request.headers.get('Cookie'))
  return {
    email: session.get('email'),
  }
}

function PrimaryNavLink(props: NavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `usa-nav__link ${isActive ? 'usa-current' : ''}`
      }
      {...props}
    >
      {props.children}
    </NavLink>
  )
}

export default function App() {
  const data = useLoaderData()
  const [expanded, setExpanded] = useState(false)
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded)

  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GovBanner />
        <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
        <Header basic className="usa-header usa-header--dark">
          <div className="usa-nav-container">
            <div className="usa-navbar">
              <Title>
                <Link to="/">
                  <img id="site-logo" src={logo} alt="NASA logo" />
                  <span id="site-title">General Coordinates Network</span>
                </Link>
              </Title>
              <NavMenuButton onClick={onClick} label="Menu" />
            </div>
            <PrimaryNav
              mobileExpanded={expanded}
              items={[
                <PrimaryNavLink to="/missions" key="/missions">
                  Missions
                </PrimaryNavLink>,
                <PrimaryNavLink to="/notices" key="/notices">
                  Notices
                </PrimaryNavLink>,
                <PrimaryNavLink to="/circulars" key="/circulars">
                  Circulars
                </PrimaryNavLink>,
                <PrimaryNavLink to="/docs" key="/docs">
                  Documentation
                </PrimaryNavLink>,
                data.email ? (
                  <>
                    <NavDropDownButton
                      type="button"
                      key="user"
                      label={data.email}
                      isOpen={userMenuIsOpen}
                      onToggle={() => setUserMenuIsOpen(!userMenuIsOpen)}
                      menuId="user"
                    />
                    <Menu
                      id="user"
                      isOpen={userMenuIsOpen}
                      items={[
                        <Link
                          key="/client_credentials"
                          to="/client_credentials"
                          onClick={() => setUserMenuIsOpen(!userMenuIsOpen)}
                        >
                          Client Credentials
                        </Link>,
                        <Link
                          key="/signout"
                          to="/signout"
                          onClick={() => setUserMenuIsOpen(!userMenuIsOpen)}
                        >
                          Sign Out
                        </Link>,
                      ]}
                    />
                  </>
                ) : (
                  <PrimaryNavLink to="/login" key="/login">
                    Sign in / Sign up
                  </PrimaryNavLink>
                ),
              ]}
              onToggleMobileNav={onClick}
            />
          </div>
        </Header>
        <ScrollRestoration />
        <section className="usa-section">
          <GridContainer>
            <Outlet />
          </GridContainer>
        </section>
        <Footer
          size="slim"
          primary={
            <FooterNav
              size="medium"
              links={[
                <a
                  className="usa-footer__primary-link"
                  href="/contact"
                  key="contact"
                >
                  Contact
                </a>,
                <a
                  className="usa-footer__primary-link"
                  href="/linkspage"
                  key="linkspage"
                >
                  Contributors
                </a>,
                <a
                  className="usa-footer__primary-link"
                  href="/docs/changes"
                  key="changelog"
                >
                  Change Log
                </a>,
              ]}
            />
          }
          secondary={
            <Logo
              size="slim"
              image={
                <img
                  className="usa-footer__logo-img"
                  alt="NASA logo"
                  src={logo}
                />
              }
              heading={
                <p className="usa-footer__logo-heading">
                  National Aeronautics and Space Administration
                </p>
              }
            />
          }
        />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
