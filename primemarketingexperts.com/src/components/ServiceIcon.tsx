import {
    Monitor, Cpu, ShoppingBag, Search, Share2, MessageSquare,
    PenTool, Target, Mail, Bot, Mic, BarChart, Video, Smartphone,
    FileText, Award, Inbox, Calendar, LineChart, Zap, TrendingUp, Code, Users, Globe
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Monitor': Monitor,
    'Cpu': Cpu,
    'ShoppingBag': ShoppingBag,
    'Search': Search,
    'Share2': Share2,
    'MessageSquare': MessageSquare,
    'PenTool': PenTool,
    'Target': Target,
    'Mail': Mail,
    'Bot': Bot,
    'Mic': Mic,
    'BarChart': BarChart,
    'Video': Video,
    'Smartphone': Smartphone,
    'FileText': FileText,
    'Award': Award,
    'Inbox': Inbox,
    'Calendar': Calendar,
    'LineChart': LineChart,
    'Zap': Zap,
    'TrendingUp': TrendingUp,
    'Code': Code,
    'Users': Users,
    'Globe': Globe,
};

interface ServiceIconProps {
    iconName: string;
    className?: string;
}

export default function ServiceIcon({ iconName, className = "w-6 h-6" }: ServiceIconProps) {
    const IconComponent = iconMap[iconName];

    if (!IconComponent) {
        // Fallback to a generic icon if not found
        return <Monitor className={className} />;
    }

    return <IconComponent className={className} />;
}
