
import { MarkdownTabInfoType } from '@family-views/common'
import ReactMarkdown from 'react-markdown'

export default function ViewMarkdownTab({tab}: {tab: MarkdownTabInfoType}) {

    return (<><ReactMarkdown>{tab.markdownContent}</ReactMarkdown></>)
}