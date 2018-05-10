import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: block;
  height: 120px;
  width: 120px;
  max-width: 100%;
  border-radius: 100%;
  position: relative;
  color: #9b9b9b;
  margin: 0 20px;
  .aCircleWrapper-percentage{
    font-size: 34px;
  }
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`

const Circle = styled.svg`
  height: 120px;
  transform: rotateZ(-90deg);
  position: relative;
  max-width: 100%;
  padding: 2px;
  circle
    transform: scale(0.9) translate(4px, 4px);
    width: 120px;
    height: 120px;
    stroke: #7DC39D;
    stroke-width: 5px;
`

const Bar = styled.circle`
  stroke: #E29591;
`

class ProgressCircle extends React.Component {
  render () {
    let val = this.props.percentage
    const r = 35
    const c = Math.PI*(r*2)
    const cx = r+2
    const cy = r+2
    if (val < 0) { val = 0}
    if (val > 100) { val = 100}

    let pct = ((100-val)/100)*c
    const strokeDasharray = Math.PI*2*r
    return <Wrapper>
       <Circle viewBox='0 0 74 74' version='1.1'>
        <circle r={r} cx={ cx } cy={ cy } fill='transparent' strokeDasharray={strokeDasharray} strokeDashoffset='0'></circle>
        <Bar r={ r } cx={ cx } cy={ cy } fill='transparent' strokeDasharray={strokeDasharray} strokeDashoffset={ pct }></Bar>
      </Circle>
      <Content className='headlineFont'>
        <div className='aCircleWrapper-percentage'>
          { `${this.props.string}` }
        </div>
      </Content>
    </Wrapper>
  }
}

ProgressCircle.propTypes = {
  string: PropTypes.string,
  percentage: PropTypes.number,
}

export default ProgressCircle
