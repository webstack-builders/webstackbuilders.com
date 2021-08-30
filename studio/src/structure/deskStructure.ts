import { SchemaType } from '@sanity/field/src/types'
import { StructureBuilder } from '@sanity/structure'
import {
  MdSettings,
  MdPerson,
  MdDescription,
  MdLocalOffer,
} from 'react-icons/md'
import IframePreview from '../previews/IframePreview'

// Web preview configuration
const remoteURL = 'https://webstackbuilders-com.netlify.app'
const localURL = 'http://localhost:8002'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

/**
 * Here you can define fallback views for document types without a structure definition
 * for the document node. If you want different fallbacks for different types, or document
 * values (e.g. if there is a slug present) you can set up that logic in here too.
 *
 * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
 */
export const getDefaultDocumentNode = (props: { schemaType: SchemaType }) => {
  const { schemaType } = props
  if (schemaType.toString() == 'post') {
    return StructureBuilder.document().views([
      // returns the default form-based editor for the 'post' document type
      StructureBuilder.view.form(),
      // takes a React component and renders it into the document view
      StructureBuilder.view
        .component(IframePreview)
        .title('Web preview')
        .options({ previewURL }),
    ])
  }
  // return the default form-based editor for all other document types
  return StructureBuilder.document().views([StructureBuilder.view.form()])
}

/**
 * This defines how documents are grouped and listed out in the Studio.
 *
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  StructureBuilder.list() // defines the first pane
    .title('Content')
    .items([
      // Settings is a singleton document to edit by virtue of setting the document ID
      StructureBuilder.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          StructureBuilder.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      StructureBuilder.divider(),
      // Fixed items broken out from spread operator to control ordering and appearance
      StructureBuilder.listItem()
        .title('Blog posts')
        .icon(MdDescription)
        .schemaType('post')
        .child(StructureBuilder.documentTypeList('post').title('Blog posts')),
      StructureBuilder.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(StructureBuilder.documentTypeList('author').title('Authors')),
      StructureBuilder.listItem()
        .title('Categories')
        .icon(MdLocalOffer)
        .schemaType('category')
        .child(
          StructureBuilder.documentTypeList('category').title('Categories')
        ),
      // `StructureBuilder.documentTypeListItems()` returns an array of all the document types
      // defined in schema.js. We filter out those that we have defined the structure above.
      ...StructureBuilder.documentTypeListItems().filter((listItem) => {
        const listItemId = listItem.getId()
        if (listItemId === undefined) {
          return false
        }
        return !['category', 'author', 'post', 'siteSettings'].includes(
          listItemId
        )
      }),
    ])
