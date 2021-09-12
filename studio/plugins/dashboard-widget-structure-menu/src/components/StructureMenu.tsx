import FileIcon from 'part:@sanity/base/file-icon'
import FolderIcon from 'part:@sanity/base/folder-icon'
import { Link } from 'part:@sanity/base/router'
import styles from './StructureMenu.css'
import React from 'react'

const getIconComponent = (item: any) => {
  if (item.icon) return item.icon
  if (!item.schemaType) return FileIcon
  return item.schemaType.icon || FolderIcon
}

interface StructureMenuProps {
  structure: {
    items: any[]
  }
}

export default function StructureMenu(props: StructureMenuProps): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.title}>Edit your content</h3>
      </div>

      <div className={styles.content}>
        {props.structure.items
          .filter((item: any) => item.type !== 'divider')
          .map((item: any) => {
            const Icon = getIconComponent(item)

            return (
              <div key={item.id}>
                <Link className={styles.link} href={`/desk/${item.id}`}>
                  <div className={styles.iconWrapper}>
                    <Icon />
                  </div>
                  <div>{item.title}</div>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}
