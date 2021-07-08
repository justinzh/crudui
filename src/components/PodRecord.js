import React from 'react'

const PodRecord = ({pod}) => {
    return (
        <div className="secton">
            <div className="card">
                <div class="row">
                    <div className="col s1 record_id">{pod.id}</div>
                    <div className="col s2">{pod.name}</div>
                    <div className="col s1">{pod.type}</div>
                    <div className="col s6">{pod.description}</div>
                    <div className="col s2 record_time">{pod.creation_time}</div>
                </div>
            </div>
        </div>
    )
}

export default PodRecord
