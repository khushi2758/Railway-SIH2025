package com.railway.scheduling.Data;

import java.util.ArrayList;
import java.util.List;

public class Graph {
    int vertices;
    List<List<Node>> adjList;

    public Graph(int vertices) {
        this.vertices = vertices;
        adjList = new ArrayList<>();
        for (int i = 0; i < vertices; i++) {
            adjList.add(new ArrayList<>());
        }
    }

    public void addEdge(int from, int to, Edge edge) {
        adjList.get(from).add(new Node(to, edge));
    }

    public List<Node> getNeighbors(int node) {
        return adjList.get(node);
    }
}
