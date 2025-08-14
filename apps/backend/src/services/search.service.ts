
import { Cluster } from '../models/cluster.model';
import { Service } from '../models/service.model';
import { Host } from '../models/host.model';

const toResponse = (item: any) => ({ ...item.toObject(), id: item._id.toString() });

export const performSearch = async (query: string) => {
    const regex = new RegExp(query, 'i');
    const [clusters, services, hosts] = await Promise.all([
        Cluster.find({ name: regex }).limit(5).lean(),
        Service.find({ name: regex }).limit(5).lean(),
        Host.find({ name: regex }).limit(5).lean(),
    ]);

    return {
        clusters: clusters.map(toResponse),
        services: services.map(toResponse),
        hosts: hosts.map(toResponse),
    };
};
