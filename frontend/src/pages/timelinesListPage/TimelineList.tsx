import React, { useState } from 'react'
import { Timeline } from '../../types/types'

const stubTimelines: Timeline[] = [
    {
        id: 1,
        notes: [],
        title: 'stub'
    },
    {
        id: 2,
        notes: [],
        title: 'aaaa'
    },
    {
        id: 3,
        notes: [],
        title: 'aaaaaaaaaa'
    },
    {
        id: 4,
        notes: [],
        title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    }
]

export const TimelineList = () => {
    const [timeline, setTimeline] = useState<Timeline[]>(stubTimelines)

    return (
        <div>
        <h1>TimelineList</h1>
    {
        timeline.map(timeline => (
            <>
                <h3>{timeline.title}</h3>
            </>
        ))
    }
    </div>
  )
}
