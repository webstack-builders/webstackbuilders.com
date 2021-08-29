import FileIcon from 'part:@sanity/base/file-icon'
import FolderIcon from 'part:@sanity/base/folder-icon'
import { Link } from 'part:@sanity/base/router'
import PropTypes from 'prop-types'
import styles from './StructureMenuWidget.css'
import React from 'react'

const getIconComponent = (item) => {
  if (item.icon) return item.icon
  if (!item.schemaType) return FileIcon
  return item.schemaType.icon || FolderIcon
}

const StructureMenuWidget = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.title}>Edit your content</h3>
      </div>

      <div className={styles.content}>
        {props.structure.items
          .filter((item) => item.type !== 'divider')
          .map((item) => {
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

StructureMenuWidget.propTypes = {
  structure: PropTypes.object,
}

export default StructureMenuWidget
