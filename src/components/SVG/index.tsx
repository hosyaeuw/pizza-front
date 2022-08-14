import * as React from "react";

export type SVGProps = Partial<{
    width: number | string;
    height: number | string;
    stroke: string;
    strokeWidth: number;
    rotate: number;
    fill: string;
    style: any;
    defaultStroke?: boolean;
    className?: string;
}> & { source: any };

const SVG: React.FC<SVGProps> = ({
    source,
    rotate,
    defaultStroke,
    className,
    ...props
}) => {
    const SourceComponent = source;
    const stroke = defaultStroke ? {} : { stroke: "#4671ff" };
    return (
        <SourceComponent
            {...stroke}
            {...props}
            className={className}
            style={{
                transform: `rotate(${rotate || 0}deg)`,
                ...props.style,
            }}
        />
    );
};

export default SVG;
