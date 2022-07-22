import styled from 'styled-components';
import { theme } from '../styles/theme';

type ColorKeyTypes = keyof Pick<typeof theme, 'fontDarkColor' | 'fontMediumColor' | 'fontLightColor'>;
type ColorTypes = typeof theme[ColorKeyTypes];

interface LabelProps {
  label: string;
  name?: string;
  subLabel?: string;
  color?: ColorTypes;
}

export default function Label({ label, name, subLabel, color = theme.fontDarkColor }: LabelProps) {
  return (
    <LabelWrapper>
      <LabelElement color={color} htmlFor={name}>
        {label}
      </LabelElement>
      {subLabel && (
        <LabelElement isSubfield color={theme.fontMediumColor}>
          {subLabel}
        </LabelElement>
      )}
    </LabelWrapper>
  );
}

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;
const LabelElement = styled.label<{ isSubfield?: boolean; color: ColorTypes }>`
  width: 100%;
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.isSubfield ? 500 : 600)};
  font-size: ${(props) => (props.isSubfield ? '0.75rem' : '0.9rem')};
  white-space: nowrap;
`;
