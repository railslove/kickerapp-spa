import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import posed from 'react-pose'

const teamProps = {
  open: {
    left: 0
  },
  closed: {
    left: -100
  }
}

const Wrapper = styled(posed.div(teamProps))`
  margin-bottom: 10px;
  border-bottom: 1px solid #f3f3f3;
  background: white;
  overflow: hidden;
  position: relative;
  left: -100%;
  max-width: 400px;
  &.asOpen{
    margin-bottom: 0;
    background: #f2f4fb;
    .quota{
      background: #f2f4fb;
    }
  }
`

const Item = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0px;
`

const Position = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  color: #9b9b9b;
  font-size: 15px;
`
const Image = styled.div`
  height: 50px;
  width: 50px;
  flex-shrink: 0;
  background-color: #999;
  background-position: center top;
  background-size: cover;
`
const Content = styled.div`
  padding: 0 10px;
  flex: 1 0 0;
`

const Name = styled.div`
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  color: #4a4a4a;
`

const Quota = styled.div`
  font-size: 15px;
  color: #9b9b9b;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
  padding-right: 10px;
  height: 90px;
  background: white;
  padding-left: 10px;
  top: 0;
`

const More = styled.div`
  display: flex;
  color: #979797;
  justify-content: space-between;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-top: 1px solid #d6d6d6;
  font-size: 13px;
  text-transform: uppercase;
`

const MoreItem = styled.div`
  display: flex;
`

const MoreItemLabel = styled.div`
  margin-right: 10px;
`

class Team extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  render(){
    return (
      <Wrapper className={this.state.isOpen ? 'asOpen' : ''} onClick={() => {this.setState({isOpen: !this.state.isOpen})}}>
        <Item>
          <Position className='headlineFont'>
            {this.props.team.position < 10 ? `0${this.props.team.position}` : this.props.team.position}
          </Position>
          <Image style={{backgroundImage: `url(${this.props.team.player1.image})`}}/>
          { this.props.team.player2 && <Image style={{backgroundImage: `url(${this.props.team.player2.image})`}}/> }
          <Content>
            <Name>{this.props.team.player1.name}</Name>
            <Name>{this.props.team.player2 && this.props.team.player2.name}</Name>
          </Content>
          <Quota className='quota'>{this.props.team.score}</Quota>
        </Item>
        {this.state.isOpen && <More class='headlineFont'>
          <MoreItem>
            <MoreItemLabel>Quota</MoreItemLabel>
            {this.props.team.percentage}%
          </MoreItem>

          <MoreItem>
            <MoreItemLabel>Wins</MoreItemLabel>
            {this.props.team.number_of_wins}
          </MoreItem>

          <MoreItem>
            <MoreItemLabel>Loses</MoreItemLabel>
            {this.props.team.number_of_losses}
          </MoreItem>
        </More> }
      </Wrapper>
    )
  }
}

Team.propTypes = {
  team: PropTypes.object.isRequired
}


export default Team
