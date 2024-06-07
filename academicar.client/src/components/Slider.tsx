import RcSlider from 'rc-slider';
import RcTooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

// https://github.com/react-component/slider
// https://github.com/react-component/slider/issues/856#issuecomment-1427008249

interface SliderProps {
    value: number | number[]
    setValue: ((value: number | number[]) => void)
    min?: number
    max?: number
    step?: number
    dots?: boolean
    range?: boolean
    disabled?: boolean
    className?: string
}

export const Slider = (props: SliderProps) => {
    return (
        <RcSlider defaultValue={props.value}
                  value={props.value}
                  onChange={props.setValue}
                  min={props.min ?? 0}
                  max={props.max ?? 100}
                  step={props.step ?? 1}
                  dots={props.dots ?? false}
                  range={props.range ?? false}
                  disabled={props.disabled ?? false}
                  className={props.className ? props.className : ''}
                  handleRender={(node, handleProps) => {
                      return (
                          <RcTooltip
                              overlayInnerStyle={{minHeight: "auto"}}
                              overlay={handleProps.value}
                              placement="top">
                              {node}
                          </RcTooltip>
                      );
                  }}
        />
    );
}