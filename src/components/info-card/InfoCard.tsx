
import type { ElementType } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

interface InfoCardProps {
    description: string
    title?: string,
    icon?: ElementType,
}

const InfoCard = ({ description, title, icon: Icon }: InfoCardProps) => {
    return (
        <Card className="p-2 gap-0 w-full">
            <CardHeader className="p-1">
                <CardTitle>
                    {Icon && <Icon size={25} />}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-1">
                <CardTitle>
                    {description}
                </CardTitle>
            </CardContent>
        </Card>
    )
}

export default InfoCard