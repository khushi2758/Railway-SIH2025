package com.railway.scheduling.Service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

@Service
public class TrainTimeSchedulingService {
    public static double[] shortestPath(Graph graph, int source) {
        int n = graph.vertices;
        double[] dist = new double[n];
        Arrays.fill(dist, Double.MAX_VALUE);
        dist[source] = 0;

        PriorityQueue<Pair> pq = new PriorityQueue<>(Comparator.comparingDouble(p -> p.weight));
        pq.add(new Pair(source, 0));

        while (!pq.isEmpty()) {
            Pair current = pq.poll();
            int u = current.node;

            for (Node neighbor : graph.getNeighbors(u)) {
                int v = neighbor.getNode();
                double weight = neighbor.getEdge().totalWeight;

                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.add(new Pair(v, dist[v]));
                }
            }
        }

        return dist;
    }
}
