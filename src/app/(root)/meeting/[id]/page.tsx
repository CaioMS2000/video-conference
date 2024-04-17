import { PropsWithChildren, HTMLProps } from 'react';

interface MeetingProps extends PropsWithChildren, HTMLProps<HTMLElement> {
    params:{
        id: string,
    }
}

export default async function Meeting({params:{id}, ...rest}:MeetingProps){

  return(
      <>
      Meeting room #{id}
      </>
  )
}