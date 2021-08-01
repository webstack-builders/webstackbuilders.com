import React from 'react'
import Header from 'components/header'
import 'styles/layout.css'
import * as styles from 'components/layout.module.css'

interface LayoutProps {
  onHideNav?(): void
  onShowNav?(): void
  showNav?: boolean
  siteTitle?: string
}

const Layout: React.PropsWithChildren = ({
  children,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
}: LayoutProps) => (
  <>
    <Header
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
    />
    <div className={styles.content}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          &copy; {new Date().getFullYear()}, Built with{' '}
          <a href="https://www.sanity.io">Sanity</a> &amp;{' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </footer>
  </>
)

export default Layout
