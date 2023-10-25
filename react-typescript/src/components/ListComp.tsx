// From react 17 onwards we don'r need to import React from 'react in each component'

import { ReactNode } from 'react'


// get a generic list and call the render method
// needs to be a generic component so, redner method will be called in parent

// if a component renders a jsx the type of that element needs to be ReactNode
// which comes from React types
type ListCompProps<T> = {
    items: T[],
    render: (item: T) => ReactNode
}

// note we need to use <T and a comma> for the generic types in tsx to work
const ListComp = <T,>({items, render}: ListCompProps<T>) => {
  return (
    
    <>
    <ul>
    {items.map((item: T) => render(item))}
    </ul>
    </>
  )
}

export default ListComp