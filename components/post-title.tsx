import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="post-title">
      {children}
    </h1>
  )
}

export default PostTitle
