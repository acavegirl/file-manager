import styled from 'styled-components';

const ToolBtn = styled.div`
  line-height: 32px;
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    color: #4096ff
  }
`

const BtnText = styled.span`
  padding-left: 8px;
`
interface PropsType {
  icon?: any;
  text: string;
  onClick?: any;
}

export default (props: PropsType) => {
  const { icon, text, onClick } = props
  return (
    <ToolBtn onClick={onClick}>
      {icon}
      <BtnText>{text}</BtnText>
    </ToolBtn>
  )
}